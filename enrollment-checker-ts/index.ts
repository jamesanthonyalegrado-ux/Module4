interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

const enrollees: Enrollee[] = [
    { name: "Alice", prelim: 85, midterm: 90, final: 88 },
    { name: "Bob", prelim: 78, midterm: 82, final: 85 },
    { name: "Charlie", prelim: 92, midterm: 88, final: 95 },
    { name: "David", prelim: 70, midterm: 75, final: 78},
    { name: "Eve", prelim: 88, midterm: 92, final: 90 }
];

enum Status {
    Passed = "Passed",
    Failed = "Failed"
}

type Average = number;
type StatusFilter = Status | "All";

const Passing_Average: Average = 75;

interface EnrolleeResult {
    name: string;
    average: Average;
    status: Status;
    remark: string;
}

function computeAverage(e: Enrollee): Average {
    return (e.prelim + e.midterm + e.final) / 3;
}

function getStatus(average: Average): Status {
    return average >= Passing_Average ? Status.Passed : Status.Failed;
}

function evaluate(e: Enrollee): EnrolleeResult {
    const average = computeAverage(e);
    const status = getStatus(average);
   const result: EnrolleeResult = {
        name: e.name,
        average: average,
        status: status,
        remark: status === Status.Passed ? "Congratulations!" : "Better luck next time."
    };
    return result;
}

function filterByStatus(
    results: EnrolleeResult[],
    statusFilter: StatusFilter
): EnrolleeResult[] {
    if (statusFilter === "All") {
        return results.filter(r => r.status === Status.Passed || r.status === Status.Failed);
    }
    return results.filter(r => r.status === statusFilter);
}

function formatLine(r: EnrolleeResult): string {
    const base = `${r.name} - Average: ${r.average.toFixed(2)} - Status: ${r.status} - Remark: ${r.remark}`;
    return r.remark ? `${base} - Remark: ${r.remark}` : base;
}

function countWhere<T>(items: T[], predicate: (item: T) => boolean): number {
    return items.filter(predicate).length;
}

function averageOf<T>(items: T[], selector: (item: T) => number): number {
    const total = items.reduce((sum, item) => sum + selector(item), 0);
    return total / items.length;
}

function printReport(data: Enrollee[]): void {
    const results: EnrolleeResult[] = data.map(evaluate);

    console.log("=== IT313 Enrollment Report ===");
    results.forEach(r => console.log(formatLine(r)));

    const classAverage = averageOf(results, r => r.average);
    const passing = countWhere(results, r => r.status === Status.Passed);

    console.log(`\nClass Average: ${classAverage.toFixed(2)}`);
    console.log;('Passing: ${passing} out of ${results.length}');
}

printReport(enrollees);