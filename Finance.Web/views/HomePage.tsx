import styled from 'styled-components';
import SectionOne from '@/resources/components/Layout/Site/SectionOne'
import SectionTwo from '@/resources/components/Layout/Site/SectionTwo'
import SectionThree from '@/resources/components/Layout/Site/SectionThree'
import SiteFooter from '@/resources/components/Layout/Site/SiteFooter'

const Wrapper = styled.div`
	background:
		radial-gradient(600px 600px at 15% -200px, rgba(34,197,94,0.16) 0%, rgba(34,197,94,0.00) 60%),
		radial-gradient(800px 800px at 85% -160px, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.00) 70%),
		linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.00) 45%),
		var(--color-surface-1);
`

const Content = styled.div``

export default function HomePage() {

	return (
		<>
		<Wrapper>
			<Content>
				<SectionOne />
				<SectionTwo />
				<SectionThree />
				<SiteFooter />
			</Content>
		</Wrapper>
		</>
	)
}


