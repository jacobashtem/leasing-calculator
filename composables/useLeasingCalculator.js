export default function useLeasingCalculator() {
  const error = ref(null);
  const loading = ref(false);
  const result = ref(null);

  async function calculateLeasingFee(formData) {
    try {
      loading.value = true;
      const response = await fetch('/api/leasingCalculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      result.value = data;
      console.log('data', data);
    } catch (err) {
      error.value = err.message || 'Something went wrong.';
    } finally {
      loading.value = false;
    }
  }

  return {
    error,
    loading,
    result,
    calculateLeasingFee
  }
}