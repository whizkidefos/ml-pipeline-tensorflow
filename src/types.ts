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

export interface ModelConfig {
  hiddenLayers: number;
  neuronsPerLayer: number;
  learningRate: number;
  batchSize: number;
  activation: 'relu' | 'sigmoid' | 'tanh';
  optimizer: 'adam' | 'sgd' | 'rmsprop';
  validationSplit: number;
  epochs: number;
}

export interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: 'classification' | 'regression';
  setSelectedTask: React.Dispatch<React.SetStateAction<'classification' | 'regression'>>;
  isTraining: boolean;
}

export interface ModelArchitectureProps {
  config: ModelConfig;
  selectedTask: 'classification' | 'regression';
}

export interface ModelConfigProps {
  config: ModelConfig;
  setConfig: React.Dispatch<React.SetStateAction<ModelConfig>>;
  selectedTask: 'classification' | 'regression';
}

export interface ModelTrainingProps {
  setModel: React.Dispatch<React.SetStateAction<tf.LayersModel | null>>;
  setMetrics: React.Dispatch<React.SetStateAction<Metrics[]>>;
  isTraining: boolean;
  setIsTraining: React.Dispatch<React.SetStateAction<boolean>>;
  dataset: Dataset | null;
  selectedTask: 'classification' | 'regression';
  modelConfig: ModelConfig;
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
