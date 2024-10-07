export class PriorityQueue<T> {
    private heap: T[] = [];
  
    
    enqueue(item: T) {
      this.heap.push(item);
      this.heap.sort();
    }
  
    dequeue(): T | null {
      return this.heap.shift() || null;
    }
  
    isEmpty(): boolean {
      return this.heap.length === 0;
    }
  }