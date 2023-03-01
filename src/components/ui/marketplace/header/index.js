import { Breadcrumbs } from "../../common";
import { EthRates, WalletBar } from "../../web3";

export default function Header() {

    const LINKS = [{
        href: '/marketplace/courses/buy',
        value: 'Buy'
    }, {
        href: '/marketplace/courses/owned',
        value: 'Owned'
    }, {
        href: '/marketplace/courses/managed',
        value: 'Manage'
    }]

    return (
        <>
            <WalletBar />
            <EthRates />
            <div className='flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8'>
                <Breadcrumbs
                    items={LINKS}
                />
            </div>
        </>
    )
}