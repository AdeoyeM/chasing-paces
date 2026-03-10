import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../Calculator'
import { PaceData } from '@/types/pace'

describe('Calculator Component', () => {
  const mockOnCalculate = jest.fn()
  const mockOnReset = jest.fn()

  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks()
  })

  it('renders the calculator form', () => {
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Check if key elements are present
    expect(screen.getByText('Goal Calculator')).toBeInTheDocument()
    expect(screen.getByLabelText(/target distance/i)).toBeInTheDocument()
    expect(screen.getByText('Calculate')).toBeInTheDocument()
  })

  it('allows user to input distance', async () => {
    const user = userEvent.setup()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    const distanceInput = screen.getByLabelText(/target distance/i)
    await user.type(distanceInput, '10')

    expect(distanceInput).toHaveValue(10)
  })

  it('allows user to select quick distance buttons', async () => {
    const user = userEvent.setup()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    const fiveKButton = screen.getByText('5K')
    await user.click(fiveKButton)

    const distanceInput = screen.getByLabelText(/target distance/i)
    expect(distanceInput).toHaveValue(5)
  })

  it('switches between km and miles', async () => {
    const user = userEvent.setup()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Type a distance in km
    const distanceInput = screen.getByLabelText(/target distance/i)
    await user.type(distanceInput, '10')

    // Switch to miles
    const unitSelect = screen.getByRole('combobox')
    await user.selectOptions(unitSelect, 'mile')

    // Check if distance was converted (10 km ≈ 6.21 miles)
    expect(distanceInput).toHaveValue(6.21)
  })

  it('validates empty distance', async () => {
    const user = userEvent.setup()
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Try to submit without distance
    const calculateButton = screen.getByText('Calculate')
    await user.click(calculateButton)

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter a valid distance greater than 0'
    )
    expect(mockOnCalculate).not.toHaveBeenCalled()

    alertMock.mockRestore()
  })

  it('validates empty time', async () => {
    const user = userEvent.setup()
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Enter distance but no time
    const distanceInput = screen.getByLabelText(/target distance/i)
    await user.type(distanceInput, '10')

    const calculateButton = screen.getByText('Calculate')
    await user.click(calculateButton)

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter a valid goal time greater than 0'
    )
    expect(mockOnCalculate).not.toHaveBeenCalled()

    alertMock.mockRestore()
  })

  it('validates unrealistic pace', async () => {
    const user = userEvent.setup()
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Enter distance
    const distanceInput = screen.getByLabelText(/target distance/i)
    await user.type(distanceInput, '10')

    // Enter very fast time (unrealistic pace)
    const hoursInput = screen.getByPlaceholderText('HH')
    const minutesInput = screen.getByPlaceholderText('MM')
    await user.type(hoursInput, '0')
    await user.type(minutesInput, '10')

    const calculateButton = screen.getByText('Calculate')
    await user.click(calculateButton)

    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('Pace seems unrealistic. Please check your distance and time')
    )
    expect(mockOnCalculate).not.toHaveBeenCalled()

    alertMock.mockRestore()
  })

  it('calculates pace correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Enter 5km distance
    const distanceInput = screen.getByLabelText(/target distance/i)
    await user.type(distanceInput, '5')

    // Enter 25 minutes
    const minutesInput = screen.getByPlaceholderText('MM')
    await user.type(minutesInput, '25')

    const calculateButton = screen.getByText('Calculate')
    await user.click(calculateButton)

    expect(mockOnCalculate).toHaveBeenCalledWith(
      expect.objectContaining({
        distance: "5",
        goalTime: '00:25:00',
        targetPacePerKm: 300, 
        targetPacePerMile: 482.80334936776904,
        unit: 'km',
      })
    )

    // Verify pace calculation (25 min / 5 km = 5 min/km = 300 seconds/km)
    const callArgs = mockOnCalculate.mock.calls[0][0]
    expect(callArgs.targetPacePerKm).toBe(300)
  })

  it('resets the form', async () => {
    const user = userEvent.setup()
    
    render(
      <Calculator
        initialData={null}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    // Fill in some data
    const distanceInput = screen.getByLabelText(/target distance/i)
    await user.type(distanceInput, '10')

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /reset form/i })
    await user.click(resetButton)

    // Check if form is cleared
    expect(distanceInput).toHaveValue(null)
    expect(mockOnReset).toHaveBeenCalled()
  })

  it('loads initial data correctly', () => {
    const initialData: PaceData = {
      distance: 10,
      goalTime: '01:30:00',
      targetPacePerKm: 540,
      targetPacePerMile: 869,
      unit: 'km',
    }

    render(
      <Calculator
        initialData={initialData}
        onCalculate={mockOnCalculate}
        onReset={mockOnReset}
      />
    )

    const distanceInput = screen.getByLabelText(/target distance/i)
    expect(distanceInput).toHaveValue(10)

    const hoursInput = screen.getByPlaceholderText('HH')
    const minutesInput = screen.getByPlaceholderText('MM')
    expect(hoursInput).toHaveValue(1)
    expect(minutesInput).toHaveValue(30)
  })
})