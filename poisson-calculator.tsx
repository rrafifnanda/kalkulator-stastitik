import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PoissonCalculator = () => {
  // State untuk menyimpan input
  const [lambda, setLambda] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Fungsi untuk menghitung probabilitas Poisson
  const hitungProbabilitasPoisson = () => {
    // Validasi input
    const lambdaNum = parseFloat(lambda);
    const kNum = parseInt(k);

    if (isNaN(lambdaNum) || isNaN(kNum) || lambdaNum < 0 || kNum < 0) {
      setError('Masukkan lambda dan k dengan benar. Keduanya harus bilangan positif.');
      setResult(null);
      return;
    }

    // Hitung faktorial
    const faktorial = (n) => {
      if (n === 0 || n === 1) return 1;
      return n * faktorial(n - 1);
    };

    // Rumus distribusi Poisson
    const probabilitas = 
      (Math.pow(lambdaNum, kNum) * Math.exp(-lambdaNum)) / faktorial(kNum);

    setResult({
      lambda: lambdaNum,
      k: kNum,
      probabilitas: (probabilitas * 100).toFixed(4)
    });
    setError('');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Kalkulator Distribusi Poisson</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Lambda (λ):</label>
              <Input 
                type="number" 
                value={lambda} 
                onChange={(e) => setLambda(e.target.value)}
                placeholder="Masukkan rata-rata kejadian"
                step="0.1"
              />
            </div>
            <div>
              <label className="block mb-2">Jumlah Kejadian (k):</label>
              <Input 
                type="number" 
                value={k} 
                onChange={(e) => setK(e.target.value)}
                placeholder="Masukkan jumlah kejadian"
              />
            </div>
            <Button 
              onClick={hitungProbabilitasPoisson} 
              className="w-full"
            >
              Hitung Probabilitas
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">Hasil Perhitungan:</h3>
                <p>Lambda (λ): {result.lambda}</p>
                <p>Jumlah Kejadian (k): {result.k}</p>
                <p>
                  Probabilitas: {result.probabilitas}% 
                  <span className="text-sm text-gray-500 ml-2">
                    (kemungkinan terjadinya {result.k} kejadian)
                  </span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoissonCalculator;
