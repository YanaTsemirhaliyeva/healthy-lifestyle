import { Helmet } from 'react-helmet-async';

type HelmetComponentProps = {
    title: string;
    desc: string;
};

export const HelmetComponent = ({ title, desc }: HelmetComponentProps) => (
    <Helmet key={title}>
        <title>{title}</title>
        <meta name='description' content={desc} />
    </Helmet>
);
