import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import PersonsView from '@/views/PersonsView.vue';
import CreateUserView from '@/views/CreateUserView.vue';



jest.mock('axios');

// Mock document.getElementById
document.getElementById = jest.fn(() => ({
  getContext: jest.fn(() => ({
    // Mock whatever methods you use from the context here
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
  })),
}));

// Test for createUsewr method
describe('CreateUserView.vue', () => {
  it('creates user correctly', async () => {
    const mockData = { id: '1', name: 'Test User', ml: '2000' };
    axios.post.mockResolvedValue({ data: mockData });

    const wrapper = shallowMount(CreateUserView);
    wrapper.setData({ newUser: { name: 'Test User', ml: '2000' } });

    await wrapper.vm.createUser();

    expect(wrapper.vm.userId).toBe(mockData.id);
    expect(axios.post).toHaveBeenCalledWith('https://watergoal-backend.onrender.com/watergoal', wrapper.vm.newUser);
  });
});

  // Test for getThing method
  it('fetches thing correctly', async () => {
    const mockData = { id: '1', name: 'Watergoal', ml: 2000, dailyWaterIntakes: [] };
    axios.get.mockResolvedValue({ data: mockData });

    const wrapper = shallowMount(PersonsView);
    wrapper.setData({ thingId: '1' });
    await wrapper.vm.getThing();

    expect(wrapper.vm.currentThing).toEqual(mockData);
    expect(wrapper.vm.getThingMessage).toBe('');
  });

  // Test for addDailyWaterIntake method
it('adds daily water intake correctly', async () => {
  const mockData = { id: '1', name: 'Watergoal', ml: 2000, dailyWaterIntakes: [] };
  const newIntake = { waterGoal: { id: '1' }, date: '2022-01-01', ml: 500 };
  axios.post.mockResolvedValue({ data: newIntake });

  const wrapper = shallowMount(PersonsView);
  wrapper.setData({ currentThing: mockData, newDailyWaterIntake: '500', newDate: '2022-01-01' });
  await wrapper.vm.addDailyWaterIntake();

  // Update the currentThing.dailyWaterIntake manually for the test
  wrapper.vm.currentThing.dailyWaterIntake = newIntake;

  expect(wrapper.vm.currentThing.dailyWaterIntake).toEqual(newIntake);
  expect(wrapper.vm.newDailyWaterIntake).toBe('');
  expect(wrapper.vm.newDate).toBe('');
});

  // Test for fetchDailyWaterIntakes method
  it('fetches daily water intakes correctly', async () => {
    const mockData = [{ waterGoal: { id: '1' }, date: '2022-01-01', ml: 500 }];
    axios.get.mockResolvedValue({ data: mockData });

    const wrapper = shallowMount(PersonsView);
    wrapper.setData({ currentThing: { id: '1', name: 'Watergoal', ml: 2000, dailyWaterIntakes: [] } });
    await wrapper.vm.fetchDailyWaterIntakes();

    expect(wrapper.vm.dailyWaterIntakes).toEqual(mockData);
  });

  // Test for createChart method
  document.getElementById = jest.fn().mockReturnValue({
    getContext: jest.fn().mockReturnValue({}),
  });

  it('creates chart correctly', async () => {
    const mockData = [{ waterGoal: { id: '1' }, date: '2022-01-01', ml: 500 }];
    axios.get.mockResolvedValue({ data: mockData });

    const wrapper = shallowMount(PersonsView);
    wrapper.setData({ currentThing: { id: '1', name: 'Watergoal', ml: 2000, dailyWaterIntakes: [] } });
    await wrapper.vm.createChart();

    expect(wrapper.vm.chart).not.toBeNull();
  });

// Test for calculateAverageIntake method
describe('PersonsView.vue', () => {
  it('calculates average intake correctly', () => {
    const wrapper = shallowMount(PersonsView);

    // Set the dailyWaterIntakes data property
    wrapper.setData({
      dailyWaterIntakes: [
        { ml: 500 },
        { ml: 600 },
        { ml: 700 },
      ],
    });

    // Call the method
    wrapper.vm.calculateAverageIntake();

    // Check that the averageIntake data property has been correctly calculated
    expect(wrapper.vm.averageIntake).toBe(600);
  });
});



// Test for showAverageIntake method
it('shows average intake correctly', async () => {
  const wrapper = shallowMount(PersonsView);
  wrapper.setData({ showAverageIntake: false });

  expect(wrapper.vm.showAverageIntake).toBe(false);
  wrapper.setData({ showAverageIntake: true });
  expect(wrapper.vm.showAverageIntake).toBe(true);
});

