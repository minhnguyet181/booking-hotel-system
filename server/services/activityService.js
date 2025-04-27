import Activity from '../models/Activity.js';

export const getAllActivities = async () => {
  return await Activity.find();
};

export const getActivityById = async (id) => {
  const activity = await Activity.findById(id);
  if (!activity) {
    throw new Error('Không tìm thấy hoạt động');
  }
  return activity;
};

export const createActivity = async (activityData) => {
  return await Activity.create(activityData);
};

export const updateActivity = async (id, activityData) => {
  const activity = await Activity.findByIdAndUpdate(
    id,
    activityData,
    { new: true, runValidators: true }
  );
  
  if (!activity) {
    throw new Error('Không tìm thấy hoạt động');
  }
  
  return activity;
};

export const deleteActivity = async (id) => {
  const activity = await Activity.findByIdAndDelete(id);
  
  if (!activity) {
    throw new Error('Không tìm thấy hoạt động');
  }
  
  return true;
};