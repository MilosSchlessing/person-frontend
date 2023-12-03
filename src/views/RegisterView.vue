<!-- Register.vue -->
<script>
import axios from 'axios';

export default {
  name: 'RegisterView', // Ändern Sie dies zu einem mehrteiligen Namen
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/api/register', {
          username: this.username,
          password: this.password
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>