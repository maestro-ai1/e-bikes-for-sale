// Public receive addresses only (never keys or seed phrases). Checked 2026-10-25: Bitcoin (bech32) and TRON (base58check) checksums valid.
export const CRYPTO = {
  bitcoinAddress: 'bc1q26x7nc3r2vjzyzjvv2mzg56sudtwum4xteg3hd',
  usdtTrc20Address: 'TXsafxfWLDFPdU8aNNec7fTZH4jkKfWYDP',
  usdtErc20Address: '0xaF80aa1ca688A1318e1F39E273cAf5895bE12749',
};

export interface CryptoWallet {
  id: string;
  label: string;
  short: string;
  network: string;
  address: string;
  /** What the QR code encodes: a bitcoin: URI for BTC, the plain address for USDT. */
  uri: string;
}

export const cryptoWallets = (): CryptoWallet[] =>
  [
    { id: 'btc', label: 'Bitcoin', short: 'BTC', network: 'Bitcoin network', address: CRYPTO.bitcoinAddress, uri: `bitcoin:${CRYPTO.bitcoinAddress}` },
    { id: 'usdt-trc20', label: 'USDT', short: 'USDT', network: 'TRC20 (TRON network)', address: CRYPTO.usdtTrc20Address, uri: CRYPTO.usdtTrc20Address },
    { id: 'usdt-erc20', label: 'USDT', short: 'USDT', network: 'ERC20 (Ethereum network)', address: CRYPTO.usdtErc20Address, uri: CRYPTO.usdtErc20Address },
  ].filter((w) => w.address);
