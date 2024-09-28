import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // 引入樣式
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // 可選，使用 Material Design Icons

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});