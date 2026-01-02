import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiService } from '@/services/api';

export const useVisitorTracker = () => {
    const location = useLocation();
    const hasLogged = useRef(false);

    useEffect(() => {
        // Simple distinct page view logging
        // In a real app, you'd want to handle this more robustly (e.g. session IDs)
        // For now, we log every distinct route change

        const logVisit = async () => {
            try {
                // Get source from query param if exists
                const params = new URLSearchParams(window.location.search);
                const source = params.get('source') || document.referrer || 'direct';

                await ApiService.logVisit({
                    landing_page: location.pathname,
                    device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                    source: source,
                    country: Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0] // Rough check
                });
            } catch (e) {
                // Fail silently
            }
        };

        // Debounce or just simplify to run on mount/change
        const timeout = setTimeout(logVisit, 1000); // 1s delay to ensure it's a real visit

        return () => clearTimeout(timeout);
    }, [location.pathname]);
};
