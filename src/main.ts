import { Cluster, ClusterOpts } from "./cluster";

function numary(options: ClusterOpts) : Cluster {
  return new Cluster(options);
}

// export default numary;
export = numary;