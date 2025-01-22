export const formatDate = (dateString: string, style: 'short' | 'long' = 'short'): string => {
    try {
        const date = new Date(dateString);

        if (style === 'short') {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(date);
        }

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};