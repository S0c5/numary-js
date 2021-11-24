import { Cluster, ClusterOpts } from "./cluster";
export * from './cluster';
export * from './account';
export * from './cursor';
export * from './ledger';
export * from './query';
export * from './schema';

function numary(options: ClusterOpts) : Cluster {
  return new Cluster(options);
}

// export default numary;
export default numary;