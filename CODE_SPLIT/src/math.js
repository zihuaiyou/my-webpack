export function sum(...args) {
    return args.reduce((pre, cur) => pre + cur);
}