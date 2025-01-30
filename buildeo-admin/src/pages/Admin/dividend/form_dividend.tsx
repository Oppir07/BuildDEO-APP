import { Separator } from "@/components/ui/separator"   
import { FileUp } from 'lucide-react'; 

export default function FormDividendPage() {
    return (
        <div>
            <div style={{ margin: '50px 50px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2 className="text-black" style={{ fontWeight: 'bold' }}>Form Dividend</h2>
                <Separator className="my-4 text-black" />
                <label htmlFor="proofPayment" style={{ display: 'block', marginBottom: '10px' }} className="text-black">Proof of payment</label>
                <label htmlFor="proofPayment" style={{ display: 'block', marginBottom: '10px' }} className="text-black">Enter proof of your payment</label>
                <form>
                    <div style={{ marginBottom: '20px' }}>
                        <div className="text-black" style={{ border: '2px dashed #E31E24', padding: '30px', textAlign: 'center', borderRadius: '8px' }}>
                            <FileUp color="#E31E24" size={50} style={{ textAlign: 'center' }}/>
                            Drag and Drop file here
                            <div>Or</div>
                            <button type="button" style={{ backgroundColor: '#D32F2F', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', marginTop: '10px' }}>Browse File</button>
                            <div className="mt-10">Formats: zip, jpg, png, pdf or ms.word</div>
                        </div>
                    </div>
                    <div>
                    </div>
                </form>
            </div>
            <button type="submit" style={{ backgroundColor: '#E31E24', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer' }}>
                Send Dividend
            </button>
        </div>
    );
}
