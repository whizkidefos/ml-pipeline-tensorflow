import * as tf from '@tensorflow/tfjs';

export interface Dataset {
  xs: tf.Tensor;
  ys: tf.Tensor;
}

export interface Metrics {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss?: number;
  valAccuracy?: number;
}

export interface ModelTrainingProps {
  setModel: React.Dispatch<React.SetStateAction<tf.LayersModel | null>>;
  setMetrics: React.Dispatch<React.SetStateAction<Metrics[]>>;
  isTraining: boolean;
  setIsTraining: React.Dispatch<React.SetStateAction<boolean>>;
  dataset: Dataset | null;
  selectedTask: 'classification' | 'regression';
}

export interface ModelMetricsProps {
  metrics: Metrics[];
  isTraining: boolean;
}

export interface ModelExportProps {
  model: tf.LayersModel | null;
}

export interface DatasetUploadProps {
  setDataset: React.Dispatch<React.SetStateAction<Dataset | null>>;
  selectedTask: 'classification' | 'regression';
}

export interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
