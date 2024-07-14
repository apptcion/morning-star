'use client'
import { RecoilRoot, atom } from "recoil"
interface RecoilRootWrapperProps {
    children: React.ReactNode;
}

const theme = atom({
    key : 'theme',
    default: 'light'
})

export default function RecoilRootWrapper({
        children,
    }: RecoilRootWrapperProps) {
        return <RecoilRoot>{children}</RecoilRoot>
    }