let totalAmount = 0;
        document.getElementById('btn').addEventListener('click' , savingToCloud);
        function savingToCloud(event){
            event.preventDefault();
            console.log(1402)

            let sellPriInput = document.getElementById("selPrice").value;
            let proNamInput = document.getElementById("proNam").value;

            const latestObj = {
                sellPriInput,
                proNamInput
            }
            // localStorage.setItem(latestObj.sellPriInput, JSON.stringify(latestObj));
            axios.post("https://crudcrud.com/api/331a4ba0e3ee4107aab7ed28479c68a9/sellerProduct", latestObj)
            .then((response) => {
                console.log(response);
                showDataOnDisplay(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        window.addEventListener("DOMContentLoaded" , () =>[
            axios.get('https://crudcrud.com/api/331a4ba0e3ee4107aab7ed28479c68a9/sellerProduct')
            .then((res) =>{
                console.log(res);
                for(let i = 0; i < res.data.length; i++)
                {
                    showDataOnDisplay(res.data[i]);
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        ])

        function showDataOnDisplay(latestObj){
            const parentUlTag = document.getElementById("receipt");
            const childLiTag = document.createElement('li');
            childLiTag.className = 'selling-receipt';
            // childLiTag.appendChild(document.createTextNode(`${latestObj.sellPriInput} - ${latestObj.proNamInput}`));
            childLiTag.textContent = latestObj.sellPriInput + ' - ' + latestObj.proNamInput;

            totalAmount = totalAmount + Number(latestObj.sellPriInput);

            document.getElementById("tAmt").innerHTML = totalAmount;

            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-danger';
            delBtn.appendChild(document.createTextNode('Delete Product'));
            delBtn.onclick = () => {
                axios.delete(`https://crudcrud.com/api/331a4ba0e3ee4107aab7ed28479c68a9/sellerProduct/${latestObj._id}`)
                .then((arr) =>{
                    console.log(arr);
                    for(let i = 0; i < arr.data.length; i++)
                    {
                        showDataOnDisplay(arr.data[i]);
                        totalAmount = totalAmount - Number(latestObj.sellPriInput);
                        document.getElementById('tAmt').innerHTML = totalAmount;
                    }
                })
                .catch((brr) =>{
                    console.log(brr);
                })
                parentUlTag.removeChild(childLiTag);
            }
            childLiTag.appendChild(delBtn);

            parentUlTag.appendChild(childLiTag);

            document.getElementById("selPrice").value = '';
            document.getElementById("proNam").value = '';
        }