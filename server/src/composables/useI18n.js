module.exports = (requestedLocale) => {

    const locale = requestedLocale || process.env.I18N_LOCALE || 'en';

    function loadMessages() {
        const messages = require(`../infra/i18n/${locale}.js`);

        if (!messages) {
            console.warn(`No messages found for locale ${locale}`);
        }

        return messages ?? {};
    }

    function t(key) {
        const messages = loadMessages();
        const keys = key.split('.');
        const message = keys.reduce((acc, current) => acc ? acc[current] : undefined, messages);

        return message || key;
    }

    return { t };
}