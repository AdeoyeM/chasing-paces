import { PaceZones } from '../PaceZones';
import { PaceData } from '@/types/pace'
import { render, screen } from '@testing-library/react'

describe('PaceZones Component', () => {
    const mockPaceData: PaceData = {
        distance: 10,
        goalTime: '00:50:00',
        targetPacePerKm: 300,
        targetPacePerMile: 483,
        unit: 'km',
    }
      it('renders pace zones', () => {
    render(<PaceZones paceData={mockPaceData} />)
    
    // Check if component renders
    expect(screen.getByText(/pace zones/i)).toBeInTheDocument()
  })

    test('it displays target pace', () => {
        render(<PaceZones paceData={mockPaceData}/>)

        //check if component renders
        expect(screen.getByText(/5:00/)).toBeInTheDocument()
    })
})
