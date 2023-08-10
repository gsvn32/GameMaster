export function sayHello() {
  alert('You clicked me!');
}
export const getCurrentDate = (dateObj) => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();

  return `${month}/${day}/${year}`;
};


