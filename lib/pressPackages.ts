export const pressPackages = [
    { value: "199", label: "Basic", price: "$199", desc: "Perfect for small projects and startups" },
    { value: "299", label: "Premium", price: "$299", desc: "Best for growing businesses and teams" },
    { value: "599", label: "Enterprise", price: "$599", desc: "Advanced features & priority support" },
]


export const getPackagePrice = (label: string) => {
    const pkg = pressPackages.find(pkg => pkg.value === label);
    return pkg ? pkg.value : null;
}