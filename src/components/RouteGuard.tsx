"use client";

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { routes, protectedRoutes } from '@/app/resources';
import { Flex, Spinner, IconButton, Input, Button, Heading } from '@/once-ui/components';
import { useTranslations } from "next-intl";

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const pathname = usePathname();
    const [isRouteEnabled, setIsRouteEnabled] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    

    useEffect(() => {
        const performChecks = async () => {
            setLoading(true);
            setIsRouteEnabled(false);
            setIsPasswordRequired(false);
            setIsAuthenticated(false);

            const checkRouteEnabled = () => {
                if (!pathname) return false;

                if (pathname in routes) {
                    return routes[pathname as keyof typeof routes];
                }

                const dynamicRoutes = ['/blog', '/work'] as const;
                for (const route of dynamicRoutes) {
                    if (pathname?.startsWith(route) && routes[route]) {
                        return true;
                    }
                }

                return false;
            };

            const routeEnabled = checkRouteEnabled();
            setIsRouteEnabled(routeEnabled);

            if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
                setIsPasswordRequired(true);

                const response = await fetch('/api/check-auth');
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            }

            setLoading(false);
        };

        performChecks();
    }, [pathname]);
    
    const t = useTranslations();
    const handlePasswordSubmit = async () => {
        const response = await fetch('/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            setIsAuthenticated(true);
            setError(undefined);
        } else {
            setError(t("popup.wrongPass"));
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    if (loading) {
        return (
            <Flex fillWidth paddingY="128" justifyContent="center">
                <Spinner />
            </Flex>
        );
    }

    if (!isRouteEnabled) {
        return (
            <Flex fillWidth paddingY="128" justifyContent="center">
                <Spinner />
            </Flex>
        );
    }

    if (isPasswordRequired && !isAuthenticated) {
        return (
            <Flex
                fillWidth paddingY="128" maxWidth={24} gap="24"
                justifyContent="center" direction="column" alignItems="center">
                <Heading align="center" wrap="balance">
                    {t("popup.passPage")}
                </Heading>
                <Flex alignItems="center" position="relative">
                    <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        label={t("popup.inputPass")}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(undefined);
                        }}
                        error={error}
                        style={{ paddingRight: "40px" }}
                    />
                    {password && (
                        <IconButton 
                            icon={isPasswordVisible ? "eyeOff" : "eye"} 
                            size="m" 
                            variant="ghost" 
                            onClick={togglePasswordVisibility} 
                            aria-label="Toggle password visibility"
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        />
                    )}
                </Flex>
                <Button onClick={handlePasswordSubmit} size="l">
                    {t("button.send")}
                </Button>
            </Flex>
        );
    }

    return <>{children}</>;
};

export { RouteGuard };