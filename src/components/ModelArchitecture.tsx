import React from 'react';
import { ModelArchitectureProps } from '../types';

const ModelArchitecture: React.FC<ModelArchitectureProps> = ({ config, selectedTask }) => {
  const inputLayer = 1; // Will be determined by dataset
  const outputLayer = selectedTask === 'classification' ? 1 : 1;
  const layers = [inputLayer, ...Array(config.hiddenLayers).fill(config.neuronsPerLayer), outputLayer];
  
  const maxNeurons = Math.max(...layers);
  const layerWidth = 150;
  const neuronRadius = 8;
  const verticalSpacing = 30;
  const width = (layers.length - 1) * layerWidth + 100;
  const height = maxNeurons * verticalSpacing + 50;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Model Architecture</h2>
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
            </marker>
          </defs>
          {layers.map((neurons, layerIndex) => {
            const isInputLayer = layerIndex === 0;
            const isOutputLayer = layerIndex === layers.length - 1;
            const x = layerIndex * layerWidth + 50;

            return (
              <g key={layerIndex}>
                {/* Layer label */}
                <text
                  x={x}
                  y={20}
                  textAnchor="middle"
                  className="text-sm fill-gray-700 dark:fill-gray-300"
                >
                  {isInputLayer
                    ? 'Input Layer'
                    : isOutputLayer
                    ? 'Output Layer'
                    : `Hidden Layer ${layerIndex}`}
                </text>

                {/* Neurons */}
                {Array(neurons).fill(0).map((_, neuronIndex) => {
                  const y = (height - neurons * verticalSpacing) / 2 + neuronIndex * verticalSpacing + 40;

                  // Draw connections to next layer
                  if (!isOutputLayer) {
                    const nextLayer = layers[layerIndex + 1];
                    const nextX = x + layerWidth;
                    return (
                      <g key={`${layerIndex}-${neuronIndex}`}>
                        {Array(nextLayer).fill(0).map((_, nextNeuronIndex) => {
                          const nextY = (height - nextLayer * verticalSpacing) / 2 + nextNeuronIndex * verticalSpacing + 40;
                          return (
                            <line
                              key={`${layerIndex}-${neuronIndex}-${nextNeuronIndex}`}
                              x1={x + neuronRadius}
                              y1={y}
                              x2={nextX - neuronRadius}
                              y2={nextY}
                              stroke="#4B5563"
                              strokeWidth="0.5"
                              strokeOpacity="0.3"
                              markerEnd="url(#arrow)"
                            />
                          );
                        })}
                        <circle
                          cx={x}
                          cy={y}
                          r={neuronRadius}
                          fill="#3B82F6"
                          className="transition-colors duration-200"
                        />
                      </g>
                    );
                  }
                  return (
                    <circle
                      key={`${layerIndex}-${neuronIndex}`}
                      cx={x}
                      cy={y}
                      r={neuronRadius}
                      fill="#3B82F6"
                      className="transition-colors duration-200"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium">Activation:</span> {config.activation}
        </div>
        <div>
          <span className="font-medium">Hidden Layers:</span> {config.hiddenLayers}
        </div>
        <div>
          <span className="font-medium">Neurons/Layer:</span> {config.neuronsPerLayer}
        </div>
        <div>
          <span className="font-medium">Optimizer:</span> {config.optimizer}
        </div>
      </div>
    </div>
  );
};

export default ModelArchitecture;
