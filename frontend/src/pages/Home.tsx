
import { ComponentExample } from '@/components/component-example'
// import { useAuth } from '@/features/auth/hooks/useAuth';

export default function Home() {
    // const { login, logout, ...data } = useAuth();
    return (
        <div>
            <div>Home</div>
            <pre>
                {/* {JSON.stringify(data, null, 2)} */}
            </pre>
            <ComponentExample />
        </div>
    )
}