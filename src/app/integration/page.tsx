import axios from "axios";
import { redirect, useRouter } from 'next/navigation'

export default async function Integration(props: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { shop } = props.searchParams;
  const { code } = props.searchParams;
  if (shop && code) {
    const response = await axios.post('http://localhost:3001/v1/shopify/access-token', { shop, code });
    console.log(response);
    redirect('/');
  }
}
