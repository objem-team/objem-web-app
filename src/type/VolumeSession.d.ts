type VolumeSession = {
  processId: int;
  name: string;
  icon: string; //base64string
  volume: float;
  isMuted: boolean;
};

export { VolumeSession };
