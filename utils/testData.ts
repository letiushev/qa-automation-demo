export function generateEmployee() {
  const timestamp = Date.now();

  return {
    firstName: `Auto${timestamp}`,
    lastName: "Tester",
    fullName: `Auto${timestamp} Tester`,
  };
}
