import ReactThemeChange from 'react-theme-change';

const base = {
    btn_radius: '50%',
};

const themes = {
    Dark: {
        bg_0: 'rgba(21, 14, 65, 1)',
        title: 'rgba(255, 255, 255, 1)',
    },
    Light: {
        bg_0: 'rgba(239, 242, 247, 1)',
        title: 'rgba(42, 49, 60, 1)',
    },
    Gray: {
        bg_0: 'rgba(35, 42, 63, 1)',
        title: 'rgba(255, 255, 255, 1)',
    },
};
const useThemeChange = ReactThemeChange({
    base,
    themes,
    defaultTheme: 'light',
});

export default useThemeChange;