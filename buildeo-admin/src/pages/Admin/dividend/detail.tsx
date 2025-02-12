import Profil from '../../../../public/profil.png';

export default function DetailDividendPage() {
    return (
        <div style={{ fontFamily: 'Arial', padding: '20px', backgroundColor: '#fff', margin: 'auto' }}>
            <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Detail Dividend</h2>
            <h3 style={{ marginTop: '10px' }}>Proof of Payment</h3>
            <div style={{
                marginTop: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                maxWidth: '300px',
                backgroundColor: '#e8f0fe',
                borderRadius: '5px', 
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                color: '#000',
            }}>
                <div>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '16px' }}>TRANSACTION DETAILS</p>
                    <p style={{ marginBottom: '0px' }}>You Send</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '0px' }}>IDR 10,000,000</p>
                    <p style={{ marginBottom: '5px' }}>(fee included)</p>
                    <p style={{ marginBottom: '5px' }}>Currency: 1 EUR = IDR 14,930.36</p>
                    <p style={{ marginTop: '5px', marginBottom: '0px' }}>They will receive</p>
                    <p style={{ fontWeight: 'bold' }}>EUR 664.37</p>
                </div>
            </div>
            <div style={{ marginTop: '20px', backgroundColor: '#fff'}}>
                <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', fontWeight: 'bold'}}>Total Service</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                    <img src={Profil} alt="LVT verlegen" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                    <div>
                        <p>LVT verlegen: 20 m²</p>
                        <p>Painter</p>
                        <p style={{ color: 'red', fontWeight: 'bold' }}>119€</p>
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>1x</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                    <img src={Profil} alt="Fliesen verlegen" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                    <div>
                        <p>Fliesen verlegen: 10 m²</p>
                        <p>Floor Layers</p>
                        <p style={{ color: 'red', fontWeight: 'bold' }}>119€</p>
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>1x</p>
                </div>
            </div>
            <div style={{
                marginTop: '20px',
                backgroundColor: '#fff',
            }}>
                <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Detail</h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    fontSize: '16px'
                }}>
                    <p style={{ color:'grey' }}>Total Payment</p>
                    <p style={{ color:'red' }}>238€</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    fontSize: '16px'
                }}>
                    <p style={{ color:'grey' }}>Dividend</p>
                    <p style={{ color:'red' }}>190.4€</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    fontSize: '16px'
                }}>
                    <p style={{ color:'grey' }}>For Company</p>
                    <p style={{ color:'red' }}>47.6€</p>
                </div>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#ccc',
                    border: 'none',
                    cursor: 'pointer',
                    alignSelf: 'center',
                    float: 'right'
                }}>Back</button>
            </div>
        </div>
    )
}
