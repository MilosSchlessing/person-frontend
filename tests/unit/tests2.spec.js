import { shallowMount, flushPromises } from '@vue/test-utils';
import RegisterView from '@/views/RegisterView.vue';
import axios from 'axios';


jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
  }));

describe('RegisterView', () => {
  const emptyResponse = null;
  const postResponse = {};

  beforeEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  it('should call axios.get when addOrToggleEmail is called', async () => {
    axios.get.mockResolvedValueOnce({ data: emptyResponse });

    const wrapper = shallowMount(RegisterView);
    await wrapper.vm.addOrToggleEmail();

    await flushPromises();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/emailReminders/' + wrapper.vm.newEmail);
  });

  it('should call axios.post when addOrToggleEmail is called', async () => {
    axios.get.mockResolvedValueOnce({ data: emptyResponse });
    axios.post.mockResolvedValueOnce(postResponse);

    const wrapper = shallowMount(RegisterView);
    await wrapper.vm.addOrToggleEmail();

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/emailReminders/create', {
      email: wrapper.vm.newEmail
    });
  });

  it('should call axios.post when toggleReminder is called', async () => {
    axios.post.mockResolvedValueOnce(postResponse);

    const wrapper = shallowMount(RegisterView);
    wrapper.setData({ currentEmailReminder: { id: 'test-id', reminderEnabled: true } });

    await wrapper.vm.toggleReminder();

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/emailReminders/enableReminder/test-id');
  });
});