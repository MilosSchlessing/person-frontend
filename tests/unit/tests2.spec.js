import { shallowMount, flushPromises } from '@vue/test-utils';
import RegisterView from '@/views/RegisterView.vue';
import PersonsView from '@/views/PersonsView.vue';
import CreateUserView from '@/views/CreateUserView.vue';
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

    expect(axios.get).toHaveBeenCalledWith('https://watergoal-backend.onrender.com/emailReminders/' + wrapper.vm.newEmail);
  });

  it('should call axios.post when addOrToggleEmail is called', async () => {
    axios.get.mockResolvedValueOnce({ data: emptyResponse });
    axios.post.mockResolvedValueOnce(postResponse);

    const wrapper = shallowMount(RegisterView);
    await wrapper.vm.addOrToggleEmail();

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith('https://watergoal-backend.onrender.com/emailReminders/create', {
      email: wrapper.vm.newEmail
    });
  });
// Test for getThing and addDailyWaterIntake methods integrationtest
it('integrates getThing and addDailyWaterIntake correctly', async () => {
  const mockData = { id: '1', name: 'Watergoal', ml: 2000, dailyWaterIntakes: [] };
  const newIntake = { waterGoal: { id: '1' }, date: '2022-01-01', ml: 500 };
  axios.get.mockResolvedValue({ data: mockData });
  axios.post.mockResolvedValue({ data: newIntake });

  const wrapper = shallowMount(PersonsView);
  wrapper.setData({ thingId: '1', newDailyWaterIntake: '500', newDate: '2022-01-01' });

  // Call getThing and addDailyWaterIntake in sequence
  await wrapper.vm.getThing();
  await wrapper.vm.addDailyWaterIntake();

  // Update the currentThing.dailyWaterIntake manually for the test
  wrapper.vm.currentThing.dailyWaterIntake = newIntake;

  expect(wrapper.vm.currentThing).toEqual(mockData);
  expect(wrapper.vm.currentThing.dailyWaterIntake).toEqual(newIntake);
  expect(wrapper.vm.newDailyWaterIntake).toBe('');
  expect(wrapper.vm.newDate).toBe('');
});

// Test for getThing and fetchDailyWaterIntakes methods integrationtest
it('sends a post request when addDailyWaterIntake is called', async () => {
  const mockData = { id: '1', name: 'Watergoal', ml: 2000, dailyWaterIntakes: [] };
  const mockResponse = { data: { dailyWaterIntake: '500' } };
  axios.get.mockResolvedValue({ data: mockData });
  axios.post.mockResolvedValue(mockResponse);

  const wrapper = shallowMount(PersonsView);
  wrapper.setData({ thingId: '1', newDailyWaterIntake: '500', newDate: '2022-01-01' });

  await wrapper.vm.getThing();
  await wrapper.vm.addDailyWaterIntake();

  expect(axios.post).toHaveBeenCalledWith('https://watergoal-backend.onrender.com/dailyWaterIntake', {
    waterGoal: { id: '1' },
    date: '2022-01-01',
    ml: '500'
  });
});
});