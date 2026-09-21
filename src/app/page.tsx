'use client';

import React, { useEffect, useState } from 'react';
import { useInspectionStore } from '@/store/useInspectionStore';
import { WizardLayout } from '@/components/ui/inspection/WizardLayout';
import { StepDispatcher } from '@/components/ui/inspection/StepDispatcher';
import { LoginForm } from '@/components/auth/LoginForm';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { SplashScreen } from '@/components/SplashScreen';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { auth, jobs } = useInspectionStore();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    // Hydration fix for Persist middleware
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && auth.isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isClient, auth.isAuthenticated, router]);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-300">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    // Authentication Layer (Gatekeeper)
    if (!auth.isAuthenticated) {
        return <LoginForm />;
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );
}
