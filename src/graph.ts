export interface Node<NV, EV> {
  value: NV;
  edges: Edge<NV, EV>[];
}

export interface Edge<NV, EV> {
  value: EV;
  nodes: [Node<NV, EV>, Node<NV, EV>];
}

export class Graph<NV, EV> {
  nodes: Set<Node<NV, EV>>;
  constructor() {
    this.nodes = new Set();
  }
  addNode = (value: NV): Node<NV, EV> => {
    const node: Node<NV, EV> = {
      value,
      edges: []
    }
    this.nodes.add(node);
    return node;
  }
  getNodes = (): Set<Node<NV, EV>> => {
    return this.nodes
  }

  getNeighbors = (value: Node<NV, EV>): Set<Node<NV, EV>> => {
    return new Set(value.edges.map((edge) => edge.nodes[1]));
  }

  addEdge = (left: Node<NV, EV>, right: Node<NV, EV>, edge: EV): void => {
    const neighbor: Edge<NV, EV> = {
      value: edge,
      nodes: [left, right],
    }
    left.edges.push(neighbor);
    right.edges.push(neighbor)
  }

  size = (): number => {
    return this.nodes.size;
  }

  bread = (loaf: Set<Node<NV, EV>>): any => {//bredtht first search
    let visited: any = new Set();
    let result: any = [];
    let queue: any = [];
    if (loaf.size > 0) {
      const iter = loaf.values();
      queue.push(iter.next().value);
    } else {
      return result;
    }


    while (queue.length > 0) {
      const current: Node<NV, EV> = queue.shift();
      if (visited.has(current.value)) {
        continue;
      } else {
        visited.add(current.value);
      }
      if (current.edges.length > 0) {
        current.edges.forEach(edge => {
          edge.nodes.forEach(node => {
            queue.push(node)
          })
        })
      }
    }
    visited.forEach((item: any) => result.push(item))
    return result;
  }
}
export const businessTrip = (graph: Graph<string, number>, route: Node<string, number>[]): number | null => {
  let cost = 0;
  let tracker = route.shift();
  while (route.length > 0) {
    const neighbors = graph.getNeighbors(tracker);
    const next = route.shift()!;
    console.log(next)
    console.log(neighbors)
    if (!neighbors.has(next)) return null;
    cost += tracker.edges.find((edge: Edge<string, number>) => edge.nodes[1] === next)?.value ?? 0;
    tracker = next;
  }
  return cost;
}