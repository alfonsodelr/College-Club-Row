import $ from "../index.module.scss" //this is just an example
import ClubHeader from "../../components/layouts/ClubHeader"

export default function createclub() {
    return (
        <ClubHeader />

    )
}

createclub.auth = true;