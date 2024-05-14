import { ChatAnthropic } from "@langchain/anthropic";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { getCustomizationData, getEmail } from "./user";

const pinecone = new Pinecone();
const chat = new ChatAnthropic({
    temperature: 0.9,
    model: "claude-3-sonnet-20240229",
    maxTokens: 1024,
});
export async function generateBotResponse(shopDomain: string, messages: string[][]) {

    const index = shopDomain.replace(/\./g, '-');
    const pineconeIndex = pinecone.Index(index);
    const email = await getEmail(shopDomain)
    const instructions = await getCustomizationData(email || "")
    let botName;
    let greetingMessage;
    let toneAndStyle;
    let userGuidance;
    let positiveReinforcement;
    let errorHandling;
    let politeness;
    let clarityAndSimplicity;
    let personalization;
    let responseLength;
    let clarificationPrompt;
    let apologyAndRetryAttempt;
    let errorMessageStyle;

    if (instructions) {
        botName = instructions[0].botName
        greetingMessage = instructions[0].greetingMessage
        toneAndStyle = instructions[0].toneAndStyle
        userGuidance = instructions[0].userGuidance
        positiveReinforcement = instructions[0].positiveReinforcement
        errorHandling = instructions[0].errorHandling
        politeness = instructions[0].politeness
        clarityAndSimplicity = instructions[0].clarityAndSimplicity
        personalization = instructions[0].personalization
        responseLength = instructions[0].responseLength
        clarificationPrompt = instructions[0].clarificationPrompt
        apologyAndRetryAttempt = instructions[0].apologyAndRetryAttempt
        errorMessageStyle = instructions[0].errorMessageStyle

    }
    const SYSTEM_TEMPLATE = `Welcome to the ${shopDomain} Virtual Shopping Assistant! This assistant is designed to provide you with a seamless and personalized shopping experience. Below are the guidelines and context for assisting our valued customers:
    You only need to answer questions related to the store
    Instructions from the Merchant are given below:
    YourName: ${botName}
    responseLength: ${responseLength}
    greetingMessage: ${greetingMessage}
    toneAndStyle: ${toneAndStyle}
    userGuidance: ${userGuidance}
    positiveReinforcement: ${positiveReinforcement}
    errorHandling: ${errorHandling}
    politeness: ${politeness}
    clarityAndSimplicity: ${clarityAndSimplicity}
    personalization: ${personalization}
    clarificationPrompt: ${clarificationPrompt}
    apologyAndRetryAttempt: ${apologyAndRetryAttempt}
    errorMessageStyle: ${errorMessageStyle}
    Answer the user's questions based on the below context. 
    If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":

    <context>
    {context}
    </context>

    `;
    const prompt1 = `Given the above conversation, generate a search query to look up in order to get information relevant to the conversation. Only respond with the query, nothing else.`;
    const queryGenerator = ChatPromptTemplate.fromMessages([
        ["system", prompt1],
        new MessagesPlaceholder("messages"),
    ]);
    const queryChain = queryGenerator.pipe(chat);

    const messagesArray = [];
    const len = messages.length;
    for (let i = 0; i < len; i++) {
        if (messages[i][0] == "user") {
            messagesArray.push(new HumanMessage(messages[i][1]));
        }
        else {
            messagesArray.push(new AIMessage(messages[i][1]));
        }
    }
    const res = await queryChain.invoke({
        messages: messagesArray
    })
    console.log(res.content)

    const vectorstore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
    );
    const retriever = vectorstore.asRetriever(4);
    const docs = await retriever.invoke(String(res.content));

    console.log(docs);

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            SYSTEM_TEMPLATE,
        ],
        new MessagesPlaceholder("messages"),
    ]);

    const documentChain = await createStuffDocumentsChain({
        llm: chat,
        prompt: questionAnsweringPrompt,
    });
    const lastReply = await documentChain.invoke({
        messages: messagesArray,
        context: docs,
    });
    return lastReply
}