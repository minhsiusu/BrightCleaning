import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // �ޤJ�˦�
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // �i��A�ϥ� Material Design Icons

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});