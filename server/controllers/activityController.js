import * as activityService from '../services/activityService.js';

export const getAllActivities = async (req, res) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json({
      success: true,
      data: activities,
      message: "Lấy danh sách hoạt động thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await activityService.getActivityById(req.params.id);
    res.status(200).json({
      success: true,
      data: activity,
      message: "Lấy thông tin hoạt động thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const createActivity = async (req, res) => {
  try {
    const activity = await activityService.createActivity(req.body);
    res.status(201).json({
      success: true,
      data: activity,
      message: "Tạo hoạt động thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const activity = await activityService.updateActivity(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: activity,
      message: "Cập nhật thông tin hoạt động thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    await activityService.deleteActivity(req.params.id);
    res.status(200).json({
      success: true,
      message: "Xóa hoạt động thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};