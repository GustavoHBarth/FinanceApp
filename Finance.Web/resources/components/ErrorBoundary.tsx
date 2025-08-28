import { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false }
	
	static getDerivedStateFromError() {
		return { hasError: true }
	}
	
	componentDidCatch(error: unknown) {
		console.error('ErrorBoundary:', error)
	}
	
	render() {
		if (this.state.hasError) {
			return <div>Algo deu errado</div>
		}
		return this.props.children
	}
}


