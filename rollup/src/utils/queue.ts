interface Task<T> {
	(): T | Promise<T>;
}

interface QueueItem<T> {
	reject: (reason?: unknown) => void;
	resolve: (value: T) => void;
	task: Task<T>;
}

export class Queue<T> {
	private readonly queue: QueueItem<T>[] = [];
	private workerCount = 0;

	constructor(private maxParallel: number) {}

	// 搜集 promise
	run(task: Task<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.queue.push({ reject, resolve, task });
			this.work();
		});
	}

	// 循环执行 promise 池子，同时开启 n 个 work。
	// 每一个 work 执行完后，数量减一，这样下一个 work 就可以开始执行。
	private async work(): Promise<void> {
		if (this.workerCount >= this.maxParallel) return;
		this.workerCount++;

		let entry: QueueItem<T> | undefined;
		while ((entry = this.queue.shift())) {
			const { reject, resolve, task } = entry;

			try {
				const result = await task();
				resolve(result);
			} catch (err) {
				reject(err);
			}
		}

		this.workerCount--;
	}
}

// function parallel(promises: Promise<any>[], count: number, retryTime: number): Promise<any[]> {
// 	return new Promise(resolve => {
// 		const result: any[] = [];
// 		const retries: Record<number, number> = {};
// 		let finishedCount = 0;
// 		let nextCount = count - 1;

// 		function work(promise: Promise<any>, index: number) {
// 			promise
// 				.then((value: any) => {
// 					result[index] = value;
// 					finishedCount++;
// 					if (finishedCount === promises.length) {
// 						return resolve(result);
// 					}
// 					nextCount++;
// 					work(promises[nextCount], nextCount);
// 				})
// 				.catch(() => {
// 					const retryCount = retries[index] || 0;
// 					if (retryCount < retryTime) {
// 						retries[index] = retryCount + 1;
// 						work(promises[index], index);
// 					}
// 				});
// 		}

// 		for (let i = 0; i < count; i++) {
// 			work(promises[i], i);
// 		}
// 	});
// }
