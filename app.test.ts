import { Graph, } from "./src/graph";


describe('A graph', () => {
  const graph = new Graph<string, string>();
  let a;
  let b;
  it('Adds nodes', () => {
    a = graph.addNode('Dragon Warhammer');
    b = graph.addNode('Granite Maul');
    expect(a.value).toBe('Dragon Warhammer');
    expect(b.value).toBe('Granite Maul');
  })

  it('Builds edges', () => {
    graph.addEdge(a, b, 'Wilderness')
    expect(a.edges.length).toBe(1)
    expect(a.edges[0].value).toBe('Wilderness')
  })

  it('Graphs neighbors', () => {
    expect(graph.getNeighbors(a).size).toEqual(1);
  });

  it('Graphs everything', () => {
    expect(graph.getNodes().has(a)).toEqual(true)
  });

  it('Has a size', () => {
    expect(graph.size()).toBe(2);
  });

});