import { SignIn } from '@clerk/clerk-react';
import { useEffect } from 'react';

const ClerkSignInForm = () => {
    useEffect(() => {
        console.log('🔐 Clerk Sign In form loaded');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        src="https://pub-d6475def8a4045c2992481493ad3c8e4.r2.dev/1.logo.png"
                        alt="MiraniWell Logo"
                        className="w-48 h-auto mx-auto mb-6 lg:w-56"
                    />
                    <h1 className="text-3xl font-bold text-charcoal mb-2 drop-shadow-sm">Welcome Back</h1>
                    <p className="text-charcoal/80 font-medium">Sign in to continue your wellness journey</p>
                </div>

                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg border-0',
                            card: 'shadow-2xl border border-gray-300 rounded-xl bg-white',
                            headerTitle: 'text-2xl font-bold text-charcoal',
                            headerSubtitle: 'text-charcoal/80 font-medium',
                            formFieldInput: 'border-gray-300 bg-white text-charcoal focus:border-primary-500 focus:ring-primary-500 placeholder:text-gray-500',
                            formFieldLabel: 'text-charcoal font-medium',
                            footerActionText: 'text-charcoal/80',
                            footerActionLink: 'text-primary-500 hover:text-primary-600 font-medium',
                            dividerText: 'text-charcoal/80',
                            socialButtonsBlockButton: 'border-gray-300 bg-white text-charcoal hover:bg-gray-50',
                            formFieldAction: 'text-primary-500 hover:text-primary-600',
                        },
                        variables: {
                            colorPrimary: '#9D6EF9',
                            colorDanger: '#ef4444',
                            colorSuccess: '#22c55e',
                            colorWarning: '#f59e0b',
                            colorNeutral: '#6b7280',
                        },
                    }}
                    redirectUrl="/"
                    signUpUrl="/clerk-sign-up"
                />
            </div>
        </div>
    );
};

export default ClerkSignInForm;
