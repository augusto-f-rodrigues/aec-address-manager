
export const exportAddressesToCSV = (addresses: AddressI[]) => {
  const csvContent = addresses
    .map(
      (address) =>
        `${address.zipCode},${address.address},${address.number},${address.complement},${address.neighborhood},${address.city},${address.state}`,
    )
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'addresses.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
