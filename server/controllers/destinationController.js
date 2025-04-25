import * as destinationService from '../services/destinationService.js';

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await destinationService.getAllDestinations();
    res.status(200).json({
      success: true,
      data: destinations,
      message: "Lấy danh sách điểm đến thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await destinationService.getDestinationById(req.params.id);
    res.status(200).json({
      success: true,
      data: destination,
      message: "Lấy thông tin điểm đến thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const createDestination = async (req, res) => {
  try {
    const destination = await destinationService.createDestination(req.body);
    res.status(201).json({
      success: true,
      data: destination,
      message: "Tạo điểm đến thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const destination = await destinationService.updateDestination(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: destination,
      message: "Cập nhật thông tin điểm đến thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    await destinationService.deleteDestination(req.params.id);
    res.status(200).json({
      success: true,
      message: "Xóa điểm đến thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};