import '../globals.css';

export const metadata = {
	title: 'Blog. Studio',
	description: 'Blog.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
