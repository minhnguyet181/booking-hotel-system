import Destination from '../models/Destination.js';

export const getAllDestinations = async () => {
  return await Destination.find();
};

export const getDestinationById = async (id) => {
  const destination = await Destination.findById(id);
  if (!destination) {
    throw new Error('Không tìm thấy điểm đến');
  }
  return destination;
};

export const createDestination = async (destinationData) => {
  return await Destination.create(destinationData);
};

export const updateDestination = async (id, destinationData) => {
  const destination = await Destination.findByIdAndUpdate(
    id,
    destinationData,
    { new: true, runValidators: true }
  );
  
  if (!destination) {
    throw new Error('Không tìm thấy điểm đến');
  }
  
  return destination;
};

export const deleteDestination = async (id) => {
  const destination = await Destination.findByIdAndDelete(id);
  
  if (!destination) {
    throw new Error('Không tìm thấy điểm đến');
  }
  
  return true;
};