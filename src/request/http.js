import axios from 'axios';


window.baseUrl = "http://localhost:3000/api";
/* eslint-disable*/
//��������

/** 
 * ����ʧ�ܺ�Ĵ���ͳһ���� 
 * @param {Number} status ����ʧ�ܵ�״̬��
 */
const errorHandle = (status, other) => {
    // ״̬���ж�
    switch (status) {
        // 401: δ��¼״̬����ת��¼ҳ
        case 401:
            this.$Message.error('401: δ��¼״̬����ת��¼ҳ')
            break;
            // 403 token����
            // ���token����ת��¼ҳ
        case 403:
            this.$Message.error('��¼���ڣ������µ�¼');

            break;
            // 404���󲻴���
        case 404:
            this.$Message.error('�������Դ������');
            break;
        case 500:
            this.$Message.error('�������');
            break;
        default:
            console.log(other);
    }
}

// ����axiosʵ�� 
var instance = axios.create({ timeout: 1000 * 12 });
// ����post����ͷ
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * ���������� 
 * ÿ������ǰ���������token��������ͷ��Я��token 
 */
instance.interceptors.request.use(
    config => {
        // ��¼���̿����У����ݱ����Ƿ����token�ж��û��ĵ�¼���        
        // ���Ǽ�ʹtoken���ڣ�Ҳ�п���token�ǹ��ڵģ�������ÿ�ε�����ͷ��Я��token        
        // ��̨����Я����token�ж��û��ĵ�¼����������ظ����Ƕ�Ӧ��״̬��        
        // �������ǿ�������Ӧ�������У�����״̬�����һЩͳһ�Ĳ�����        
        const token = localStorage.getItem("token");
        token && (config.headers.Authorization = token);
        return config;
    },
    error => Promise.error(error))

// ��Ӧ������
instance.interceptors.response.use(
    // ����ɹ�
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // ����ʧ��
    error => {
        const { response } = error;
        if (response) {
            // �����ѷ��������ǲ���2xx�ķ�Χ 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // �������������
            // eg:����ʱ�����ʱ������state��network״̬
            // network״̬��app.vue�п�����һ��ȫ�ֵĶ�����ʾ�������ʾ����
            // ���ڶ�������е�ˢ�����»�ȡ���ݣ����ڶ��������˵��
            if (!window.navigator.onLine) {
                this.$Message.error('�������');
            } else {
                return Promise.reject(error);
            }
        }
    });

export default instance;