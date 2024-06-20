"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminRole } from '../../../lib/actions';

export default function Page(props: { searchParams: { [key: string]: string | undefined } }) {
    const { id } = props.searchParams;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setAdminRole(id).then(() => {
                const timeout = setTimeout(() => {
                    router.push(`/`);
                }, 60000);

                return () => {
                    clearTimeout(timeout);
                };
            });
        }
    }, [id, router]);

    if (!id) {
        return (
            <a href="http://localhost:3000/admin/home" target="_blank" rel="noopener noreferrer">
                Dashboard
            </a>
        );
    }

    return (
        <div>
            {loading ? (
                <p>Setting admin role, please wait...</p>
            ) : (
                <p>Preparing to set admin role...</p>
            )}
        </div>
    );
}
