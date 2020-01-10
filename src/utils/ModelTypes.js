export const ModelTypes = {
   FromNormalisedData : {
    name: 'From normalised data',
    modelPath:  'models/tfjs_model_lstm_normalised__W_20_lr_0_0005_epochs=50_batch_128.h5/model.json',
    weightPath: 'models/tfjs_model_lstm_normalised__W_20_lr_0_0005_epochs=50_batch_128.h5/group1-shard1of1.bin',
    mustNormalise: true
} ,
FromNonNormalisedData : {
    name: 'From non normalised data',
    modelPath:  'model.json',
    weightPath: 'group1-shard1of1.bin',
    mustNormalise: false
}
} 
